const Task = require("../model/Task");

const taskController = {};

// 할일 생성
taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body;
        const newTask = new Task({ task, isComplete });
        await newTask.save();
        res.status(200).json({ status: 'ok', data: newTask });
        res.send();
        //return res.status(200).json({ status: "success", data: newTask });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
};

// 할일 리스트 출력
taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find({}).select("-__v");
        res.status(200).json({ status: 'ok', data: taskList });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
};

// 할일 상태(끝남/안끝남) 변경
taskController.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            throw new Error("App cannot find the task");
        }
        const fields = Object.keys(req.body);
        fields.map((item) => (task[item] = req.body[item]));
        await task.save();
        res.status(200).json({ status: 'ok', data: task });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
};

// 할일 삭제
taskController.deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);
        if (!deleteTask) {
            throw new Error("App cannot find the task");
        }
        res.status(200).json({ status: 'ok', data: deleteTask });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
};

module.exports = taskController;