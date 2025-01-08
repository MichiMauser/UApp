import { useSelector } from "react-redux";
import Layout from "../../components/layout";
import { useState, useEffect } from 'react';
import classes from '../../styles/ForumHomePage.module.css';
import { useQuery } from '@tanstack/react-query';

async function getAnnouncements() {
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

export default function Home() {
    const { data: announcementAux, isError, isLoading } = useQuery({
        queryFn: getAnnouncements,
        queryKey: ['announcement_receive'],
        staleTime: 100,
    });

    const [announcements, setAnnouncements] = useState([]);

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

            // Set the announcements in reverse order (so the latest one is last)
            setAnnouncements(updatedAnnouncements.reverse());
        }
    }, [announcementAux]);

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Forum Announcements</h1>

            {isLoading && <p>Loading announcements...</p>}
            {isError && <p>Error loading announcements. Please try again later.</p>}

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

Home.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    );
};
