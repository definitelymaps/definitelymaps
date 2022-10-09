import { Request, Response, NextFunction } from "express";

import Repo from "./repo";

export const ReadAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repo: Repo = req.app.get("repo").status;

  const ok = await repo.connected();

  if (!ok) {
    req.log.error("not connected to database");
    res.status(500);
    res.json({ ok: false });
  } else {
    res.status(200);
    res.json({ ok: true });
  }
};
