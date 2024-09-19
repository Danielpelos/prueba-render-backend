    import nodemailer from "nodemailer"

    export const emailNotificaion = async (datos) =>{
        const emailAdmin = 'admin@gmail.com'
        const { id } = datos

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "5a639b2093dcbc",
            pass: "7ef18af37095f0"
            }
        });

        //Informacion del Email
        const notificacion = await transport.sendMail({
            from: '"Alerta de nueva solicitud, revisa ahora" <mailsena@info.com',
            to: emailAdmin,
            text: "Revisa una nueva solicitud para curso complementario.",
            html: `<p>Tienes una nueva solicitud para curso complementario, ingresa en el siguiente enlace:
            <a href="http://localhost:5173/login">Revisar Solicitudes</a>
            </p>
            `,  
        })
    }

    export const emailOlvideClave = async (datos) =>{
        const emailAdmin = 'admin@gmail.com'
        const { email, nombres, token  } = datos

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "5a639b2093dcbc",
            pass: "7ef18af37095f0"
            }
        });

        //Informacion del Email
        const notificacion = await transport.sendMail({
            from: '"Alerta restablecer contraseña, revisa ahora" <mailsena@info.com',
            to: emailAdmin,
            text: "Has solicitado restablecer tu contraseña de administrador",
            html: `<p>Hola:" "${nombres} Si tu no has solicitado restablecer contraseña, por favor omita este mensaje, <span>Para restablecer contraseña haz clic en el siguiente enlace</span>:
            <a href="http://localhost:5173/olvide-clave/${token}">Restableser contraseña</a>
            </p>
            `,  
        })
    }

    