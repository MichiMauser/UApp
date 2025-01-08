import { useState, useEffect } from 'react';
import Layout from "../../components/layout";
import classes from '../../styles/ForumHomePage.module.css';
import { useSelector } from 'react-redux'
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';

async function getAnnouncements(){

    const response = await fetch('http://127.0.0.1:8000/announcements/getAnnouncements/');

    if (!response.ok) {
      const error = new Error('An error occurred while getting announcements data');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
    const result = await response.json();
    return result;
}

async function sendNewAnnouncementData(formData){

    const response = await fetch('http://127.0.0.1:8000/announcements/createAnnouncement/',
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
        }
    );

    if (!response.ok) {
      const error = new Error('An error occurred while sending washing data');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
    const result = await response.json();
    return result;
}

export default function AdminDashboard(){
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('news');
    const [announcements, setAnnouncements] = useState([]);
    const { user } = useSelector((state) => state.user);

   // const userName = "John Doe";  //user.userName;//ricule???

    const { data: announcementAux, isError, isLoading } = useQuery({
        queryFn: getAnnouncements,
        queryKey: ['announcement_receive'],
        staleTime: 100,
    });

    const { mutate, error: error2, isError: isError2, isPending } = useMutation({
        mutationFn: sendNewAnnouncementData,
        });

        useEffect(() => {
            if (announcementAux && announcementAux.announcements) {
                const updatedAnnouncements = announcementAux.announcements.map((slot) => {
                    const date = new Date(slot.created_at);
                    const formattedDate = date.toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true,
                    });
        
                    return {
                        id: slot.id,
                        title: slot.title,
                        content: slot.content,
                        author: slot.author,
                        type: slot.type,
                        date: formattedDate,
                    };
                });
        
                setAnnouncements(updatedAnnouncements.reverse());
            }
        }, [announcementAux]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handlePostMessage = () => {
        if (message.trim() && title.trim()) {
            const currentDate2 = new Date().toLocaleString();
            setAnnouncements([
                {
                    id: Date.now(),
                    title: title.trim(),
                    content: message.trim(),
                    date: currentDate2,
                    author: user.username,
                    type: type || 'news',
                },
                ...announcements
            ]);

            setMessage('');
            setTitle('');
            setType('news');

            const currentDate = new Date()
            const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ` + 
            `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}.` +
            `${currentDate.getMilliseconds().toString().padStart(3, '0')}000`;
            const newAnnouncement = {
                title: title.trim(),
                content: message.trim(),
                date: formattedDate,
                author: user.username,
                type: type || 'news',
            }
            mutate(newAnnouncement);
        }
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Forum Announcements</h1>

            <div className={classes.announcementInput}>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Write your title here..."
                    className={classes.titleField}
                />
                <textarea
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Write your message here..."
                    className={classes.inputField}
                />
                <div className={classes.optionsRow}>
                    <select
                        value={type}
                        onChange={handleTypeChange}
                        className={classes.typeDropdown}
                    >
                        <option value="news">News</option>
                        <option value="event">Event</option>
                        <option value="alert">Alert</option>
                    </select>
                    <button onClick={handlePostMessage} className={classes.postButton}>
                        Post Announcement
                    </button>
                </div>
            </div>

            <div className={classes.announcementList}>
                {announcements.map((announcement) => (
                    <div key={announcement.id} className={classes.announcement}>
                        <p className={classes.announcementTitle}>
                            <strong>{announcement.type.toUpperCase()}:</strong> {announcement.title}
                        </p>
                        <p>{announcement.content}</p>
                        <div className={classes.metaInfo}>
                            <span>Posted by: {announcement.author}</span>
                            <span>{announcement.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

AdminDashboard.getLayout = function getLayout(page){
    return (
        <Layout>
            {page}
        </Layout>
    )
}