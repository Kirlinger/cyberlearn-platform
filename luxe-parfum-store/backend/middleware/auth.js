import jwt from 'jsonwebtoken';
export const protect=(req,res,next)=>{const h=req.headers.authorization;if(!h?.startsWith('Bearer ')) return res.status(401).json({message:'Unauthorized'});try{req.user=jwt.verify(h.split(' ')[1],process.env.JWT_SECRET);next();}catch{res.status(401).json({message:'Invalid token'});}};
export const admin=(req,res,next)=> req.user?.isAdmin ? next() : res.status(403).json({message:'Admin only'});
