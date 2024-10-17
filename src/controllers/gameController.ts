// gameController.ts
import { Request, Response } from 'express';

import { getUser, getUsers, lista_historys, add_history, get_history } from '../services/gameService';
import { UserGet } from '../types';



interface RequestToken extends Request {
  userId?: string
  usuario?: string
}

export const game = async (req: RequestToken, res: Response) => {
  try {
    if (!req.userId || !req.usuario) {
      throw new Error("Error en optener el usuario en game ");
    }
    const user = await getUser(req.userId);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "No se sabe el error" });
    }
  }
};

export const litsUsers = async (req: any, res: Response) => {
  let datos: UserGet[] | undefined = []
  if (typeof req.rol == "number")
    datos = await getUsers();
  res.status(200).json(datos)
}

export const litsHistory = async (req: any, res: Response) => {
  console.log(req.userId);

  const lista = await lista_historys(req.userId);

  res.status(200).json(lista)

}

export const add_new_history = async (req: any, res: Response) => {

  try {
    const { score, level, duration } = req.body
    if (req.userId)
      await add_history(req.userId, score, level, duration)

    res.status(201).send("Se adicino un nuevo historial")
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send("Error No se sabe ")
    }

  }
}

export const get_historyId = async (req: any, res: Response) => {
  const nivel = Number(req.params.nivel)
  const userId = req.userId;
  if (nivel >= 0 && userId) {
    const listaHistory = await get_history(nivel, userId);
    res.status(200).json(listaHistory)
  } else {
    res.status(404).send("No se encontro el usuario")
  }
}