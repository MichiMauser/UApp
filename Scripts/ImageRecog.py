
import pytesseract
from PIL import Image, ImageFilter
import cv2
import numpy as np
import random
pytesseract.pytesseract.tesseract_cmd = r"C:/Program Files/Tesseract-OCR/tesseract.exe"


def img_to_dict(img: Image) -> dict:
    person_data = {}
    cnp = pytesseract.image_to_string( img.crop((710, 260, 1220, 350)))
    name = pytesseract.image_to_string(img.crop((590, 380, 895, 465 )))
    first_name = pytesseract.image_to_string(img.crop((600, 490, 1170, 575)))
    
    person_data['cnp'] = cnp
    person_data['name'] = name+first_name
    return person_data

def update_info(person_info: dict) -> dict:
    
    person_info['gender'] = 'M' if int(person_info['cnp'][0]) % 2 == 1 else 'F'
    person_info["birth_date"] = "".join(list(reversed([person_info['cnp'][i * 2 + 1 + 0: i * 2 + 2 + 1]+'-' for i in range(3)])))[0: -1]
    
    name_list = list(person_info['name'])
    cnp_list = list(person_info['cnp'])

    random.shuffle(name_list)
    random.shuffle(cnp_list)
    
    password = ''.join(name_list[:4]) + ''.join(cnp_list[:4]) + '!@#$&'
    
    password_list = list(password)
    random.shuffle(password_list)
    person_info['password'] = ''.join(password_list)
    return person_info



def convert_image_to_data(img: Image) -> dict:
    data = {
    }
    data = img_to_dict(img)
    data = update_info(data)
    return data
if __name__ == "__main__":
    image = Image.open("poz1.jpeg")
    print(convert_image_to_data(image))