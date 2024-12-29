import pytesseract
from PIL import Image, ImageFilter
# import cv2
import numpy as np
import random

pytesseract.pytesseract.tesseract_cmd = r"C:/Program Files/Tesseract-OCR/tesseract.exe"


def img_to_dict(img: Image) -> dict:
    person_data = {}
    cnp = pytesseract.image_to_string(img.crop((710, 260, 1220, 350)))
    name = pytesseract.image_to_string(img.crop((590, 380, 895, 465)))
    first_name = pytesseract.image_to_string(img.crop((600, 490, 1170, 575)))

    person_data['cnp'] = cnp
    person_data['real_name'] = name[:-1] + " " + first_name[:-1]
    return person_data


def update_info(person_info: dict) -> dict:
    person_info['gender'] = 'M' if int(person_info['cnp'][0]) % 2 == 1 else 'F'
    person_info["birthday"] = "".join(
        list(reversed([person_info['cnp'][i * 2 + 1 + 0: i * 2 + 2 + 1] + '-' for i in range(3)])))[0: -1]
    birthday = person_info["birthday"]
    if int(birthday[6]) < 2:
        person_info["birthday"] = "20" +  birthday[6:8] + '-' + birthday[3:5] + '-' + birthday[0:2]
    else:
        person_info["birthday"] = "19" + birthday[6:8] + '-' + birthday[3:5] + '-' + birthday[0:2]
    name_list = list(person_info['real_name'])
    cnp_list = list(person_info['cnp'][:-1])

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
    copy = img
    data = img_to_dict(copy)
    data = update_info(data)
    return data
