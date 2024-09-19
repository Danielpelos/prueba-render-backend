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
            <a href="${process.env.ENLACES_URL}/solicitudes/${id}">Revisar Solicitud</a>
            </p>
            `,
            
            
            
            

        })
    }