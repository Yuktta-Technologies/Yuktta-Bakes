import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../lib/prisma";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const admin = await prisma.admin.findUnique({
        where: { id: payload.id },
      });

      if (!admin) return done(null, false);
      return done(null, admin);
    } catch (err) {
      done(err, false);
    }
  })
);

export default passport;
