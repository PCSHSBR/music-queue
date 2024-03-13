# Music Queue

รายการคิวเพลงสำหรับช่วงวัน เรียงตามลำดับที่ขอ โดยแสดงคิวเพลงที่ขอในฟอร์ม [forms.gle/CktJEiBMNAGVxhwa8](https://forms.gle/CktJEiBMNAGVxhwa8)

## แจ้งปัญหา

สามารถแจ้งได้ที่ฝ่ายประชาสัมพันธ์ สภานักเรียน

## การทำงาน

เว็บนี้รันแบบ static โดยใช้ GitHub Pages เพื่อให้ได้ Custom Domain โดยฝังหน้าเว็บจากเว็บแอปของ Google App Script ใน [Project "Song request handler"](https://script.google.com/home/projects/17r1sIXSuRdb0WH6NtA8vHBYo0DohurFeYlO0nMA79ZLqtLxOXVmmNQvx) นำขอมูลมาจาก Google Spreadsheet ที่เก็บข้อมูลคิวเพลง มีการแคชและออโต้รีเฟรชตารางนิดหน่อยเพื่อความสะดวก รายละเอียดปลีกย่อยสามารถอ่านได้ภายในโค้ด ซึ่งถูกนำเข้า Google App Script ด้วย [clasp][]

## Dataset
นักเรียนภายในโรงเรียนสามารถเข้าถึงข้อมูลได้ที่ [ลิงก์ Google Sheet นี้](https://docs.google.com/spreadsheets/d/1OJlKqJglzFwLVtOslvCfHhkCtsV0LuxbuzwiYvlO0xA/edit?usp=sharing) ด้วยอีเมลองค์กร สำหรับบุคคลภายนอก โปรดไปที่ [หน้า dataset บน Huggingface](https://huggingface.co/datasets/Patsagorn/pcshsbr-music-request)

[clasp]: https://g.co/codelabs/clasp

---

<center><sup><i>MIT (c) 2022-2023 Patsagorn Y.<br>PCSHSBR.SC PR&C Team</i></sup></center>

<center><sub>

[Join us 🤟](https://github.com/PCSHSBR/.github/blob/main/join-us.md)</sub></center>
