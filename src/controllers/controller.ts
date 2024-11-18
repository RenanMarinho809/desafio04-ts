import { Request, Response } from "express";

interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [];

export class UserController {
  static getAllUsers(req: Request, res: Response): void {
    res.status(200).json(users);
  }

  static createUser(req: Request, res: Response): void {
    const { name, email } = req.body;

    if (!name) {
       res.status(400).json({ error: "Name is required" });
    }

    if (!email) {
       res.status(400).json({ error: "Email is required" });
    }

    const newUser: User = {
      id: users.length + 1,
      name,
      email,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  }

  static deleteUser(req: Request, res: Response): void {
    const { id } = req.params;
    const userId = parseInt(id);

    if (!userId) {
       res.status(400).json({ error: "Invalid user ID" });
    }

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      res.status(404).json({ error: "User not found" });
    }

    users.splice(userIndex, 1);
    res.status(200).json({ message: "User deleted successfully" });
  }
}
