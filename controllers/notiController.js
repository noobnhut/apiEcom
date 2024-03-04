const db = require('../models');
const User = db.User;
const Noti = db.Notification;
const sequelize = require('sequelize');
const Op = sequelize.Op


const getFullNoti = async (req, res) => {
    try {
        const noti = await Noti.findAll({
            include: [
                { model: User, attributes: ["fullname"] },
              ],
        });
        res.json(noti);
    } catch (error) {
        console.log(error);
    }
}

const getNotiByUser = async (req, res) => {
    try {
        
        const id = req.params.id;
        const user = await User.findByPk(id);
        if(!user){
            return res.status(201).json({ message: 'Không tồn tại user.' });
        }else{
            const noti = await Noti.findAll(
                {
                    where: { id_user: user.id } 
                }
            );
            res.json(noti);
        }
    } catch (error) {
        console.log(error);
    }
}

const addNoti = async (req, res) => {
    try {
        const { title, content } = req.body

        const users = await User.findAll();
        for(const user of users){
            const notification = await Noti.create({
                title: title,
                content: content,
                id_user: user.id
            });
            res.io.emit('notification', notification);
        }
        res.json({success:true,message:"Thêm thông báo thành công."})
    } catch (error) {
        console.log(error);
    }
}

const deleteNoti = async (req, res) => {
    try {
        const id = req.params.id;
        const noti = await Noti.findByPk(id);
            if(!noti){
                return res.json({ success:false,message: 'Không tồn tại thông báo.' });
            }else{
                noti.destroy();
                return res.json({success:true, message: 'Xóa thành công.' });
            }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getFullNoti,
    getNotiByUser,
    addNoti,
    deleteNoti,
}