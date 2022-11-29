
/**
 * จำนวนมิลลิวินาทีหลังจากที่บรรทัดสุดท้ายถูกขอก่อนที่จะให้สคริปต์ดึงค่าจากแคช
 * เช่น เพลงสุดท้ายขอตอน 06:30:32, สคริปต์สุดจะไม่ใช้ค่าจากแคชจนกว่าจะถึง 06:30:32 + ค่านี้
 * @type {number} จำนวนเป็นมิลลิวินาที
 */
const MIN_LAST_TIME_BEFORE_USE_CACHE = 1000 * 60 * 3; // 3 minutes

/**
 * จำนวนมิลลิวินาทีอย่างมากหลังจากที่บรรทัดสุดท้ายถูกขอก่อนที่จะให้สคริปต์ดึงค่าจากแคช
 * เช่น เพลงสุดท้ายขอตอน 06:30:32 เมื่อเช้า แต่ตอนนี้ตอนเย็น จะซึ่งเกิน 12 ชั่วโมง สคริปต์จะไม่ใช้ค่าจากแคช
 */
const MAX_LAST_TIME_BEFORE_USE_CACHE = 1000 * 60 * 60 * 6; // 12 hours

/**
 * ชื่อแคชที่จะใช้ในการเก็บข้อมูล
 * แก้ไขตรงนี้จะเป็นการรีเฟรชแคช
 */
const QUEUE_CACHE_KEY = "queue2";

/**
 * ระยะเวลาที่แคชจะหมดอายุ ก่อนจะถูกคำนวนใหม่
 */
const CACHE_TIME = 1000 * 60 * 30; // 30 minutes

/**
 * ชีตที่ใช้เก็บข้อมูล สถิติ ต่าง ๆ และใช้ดึงรายการคิวเพลง
 */
const DATA_SHEET_URL = "https://docs.google.com/spreadsheets/d/1OJlKqJglzFwLVtOslvCfHhkCtsV0LuxbuzwiYvlO0xA/edit?usp=sharing"

/**
 * ชื่อเวิร์กชีตที่ใช้เก็บข้อมูล
 */
const SHEET_NAME = "rawdata";