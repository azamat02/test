import axios from "axios";

export default class CoursesApi{
    constructor() {
        this._apiBase = 'http://89.223.24.146:8000/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`);
        }
        return await res.json();
    }

    getAllComments = async () => {
        const res = await this.getResource(`/comments/`);
        if (res == null) {
            return []
        }
        return res.map(this._transformComment());
    }

    getAllUsers = async () => {
        const res = await this.getResource(`/users/`);
        if (res == null) {
            return []
        }
        return res.map(this._transformUser);
    }

    getAllModules = async () => {
        const res = await this.getResource(`/modules/`);
        if (res == null) {
            return []
        }
        return res.map(this._transformModule);
    }

    getAllLessons = async () => {
        const res = await this.getResource(`/lessons/`);
        if (res == null) {
            return []
        }
        return res.map(this._transformLesson);
    }

    getAllCourses = async () => {
        const res = await this.getResource(`/courses/`);
        const modules = await  this.getAllModules()

        return res.map(course=>{
            let newElem = {...course, lessonsCount: 0}
            let lessonsCount = 0

            modules.forEach(elem=>{
                if(elem.moduleCourseId == course.id){
                    lessonsCount += + elem.moduleNumberOfLessons
                }
            })

            newElem.lessonsCount = lessonsCount
            return newElem
        }).map(this._transformCourse);
    }

    getPurchasedCoursesByUsedId = async (id) => {
        const res = await this.getResource(`/purchased/by_user/${id}`);
        if (res == null) {
            return []
        }
        return res.map(this._transformPurchasedCourses);
    }

    getModulesByCourseId = async (id) =>{
        const res = await this.getResource(`/modules/by_course/${id}`);
        if (res == null) {
            return []
        }
        return res.map(this._transformModule);
    }

    getLessonsByModuleId = async (id) =>{
        const res = await this.getResource(`/lessons/by_module/${id}`);
        if (res == null) {
            return []
        }
        return res.map(this._transformLesson);
    }

    getCommentsByCourseId = async (id) => {
        const res = await this.getResource(`/comments/by_course/${id}`);
        if (res == null) {
            return []
        }
        return res.map(this._transformComment);
    }

    getUser = async (id) => {
        const res = await this.getResource(`/users/${id}`);
        return this._transformUser(res);
    }

    getCourse = async (id) => {
        const res = await this.getResource(`/courses/${id}`);
        return this._transformCourse(res);
    }

    getComment = async (id) => {
        const res = await this.getResource(`/comments/${id}`);
        return this._transformComment(res);
    }

    getModule = async (id) => {
        const res = await this.getResource(`/modules/${id}`);
        return this._transformModule(res);
    }

    getLesson = async (id) => {
        const res = await this.getResource(`/lessons/${id}`);
        return this._transformLesson(res);
    }

    checkIfUserRated = async(data) => {
        let res
        await axios.post(`${this._apiBase}/comments/check`, data)
            .then(data => {res = data})
        return res
    }

    getUserCourseAnalytics = async(data) => {
        let res = axios.post(`${this._apiBase}/get/course/analytics`, data)
        return res
    }

    checkIfPurchasedCourse = async (id) => {
        let res = await fetch(`${this._apiBase}/purchased/has/${id}`, {
            headers: {'Content-type': 'application/json'},
            credentials: 'include'
        })

        let json = await res.json()

        return json
    }

    isSet(data) {
        if (data) {
            return data
        } else {
            return 'no data'
        }
    }

    getUserRecs = async (userId)=>{
        let res = await axios.get(`${this._apiBase}/users/recs/${userId}`)
        return res
    }

    _transformUser = (user) => {
        return {
            userId: this.isSet(user.id),
            userName: this.isSet(user.name),
            userSurname: this.isSet(user.surname),
            userLogin: this.isSet(user.login),
            userEmail: this.isSet(user.email),
        };
    }

    _transformCourse = (course) => {
        return {
            courseId: this.isSet(course.id),
            courseLessons: this.isSet(course.lessonsCount),
            courseImage: this.isSet(course.img),
            courseTitle: this.isSet(course.title),
            courseDesc: this.isSet(course.desc),
            courseReqs: this.isSet(course.req),
            courseAdv: this.isSet(course.what_you_will_learn)
        };
    }

    _transformModule = (module) => {
        return {
            moduleId: this.isSet(module.id),
            moduleTitle: this.isSet(module.title),
            moduleCourseId: this.isSet(module.c_id),
            moduleNumberOfLessons: this.isSet(module.number_of_lessons)
        };
    }

    _transformLesson = (lesson) => {
        return {
            lessonId: this.isSet(lesson.id),
            lessonType: this.isSet(lesson.type),
            lessonModuleId: this.isSet(lesson.m_id),
            lessonTitle: this.isSet(lesson.title),
            lessonLink: this.isSet(lesson.link),
            lessonContent: this.isSet(lesson.content)
        };
    }

    _transformComment = (comment) => {
        return {
            commentId: this.isSet(comment.id),
            commentText: this.isSet(comment.ctext),
            commentCourseId: this.isSet(comment.c_id),
            commentUserId: this.isSet(comment.u_id),
            commentRate: this.isSet(comment.rate),
            commentCreatedDate: this.isSet(comment.created_date),
        };
    }

    _transformPurchasedCourses = (purchase) => {
        return {
            purchaseId: this.isSet(purchase.id),
            purchaseUserId: this.isSet(purchase.u_id),
            purchaseCourseId: this.isSet(purchase.c_id),
            purchaseDate: this.isSet(purchase.purchased_date),
            courseProgress: this.isSet(purchase.course_progress),
        };
    }

}

