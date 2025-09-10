const express = require('express');
const Task = require('../models/task');
exports.getTask = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
};

exports.addTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const task = await Task.create({
            title,
            description,
            status,
            dueDate,
            user: req.user.id
        });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};

exports.updateTask = async (req, res) => {

    const taskId = req.params.id;
    const user = req.user;
    let taskToUpdate = await Task.findOne(taskId, user);
    if (!taskToUpdate) return res.status(404).json({ message: "Task not found" });
    taskToUpdate = await Task.updateOne(taskId, req.body, user);
    res.status(200).json(taskToUpdate);
};
exports.removeTask = async (req, res) => {

    const taskId = req.params.id;
    const user = req.user;
    let taskToDelete = await Task.findOne(taskId, user);
    if (!taskToDelete) return res.status(404).json({ message: "Task not found" });
    taskToDelete = await Task.deleteOne(taskId, user);
    res.status(200).json(taskToDelete);
}