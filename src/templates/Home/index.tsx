import { socket } from '../../services/api/websocket'
import styles from './styles.module.css'
import { useState, useEffect } from 'react'

import Route from '../../components/Route'
import {
    Navbar
} from '../../components/Navbar'
import { Chat } from '../../components/Chat'
import { Notification } from '../../helpers/Notification'
import { IRoute, IntentOfTravel } from '../../interfaces/travel.interfaces'
import { LoadScript } from '@react-google-maps/api'

export const Home = () => {
    const notifier = new Notification()
    const [loading, setLoading] = useState("skeleton")
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') as string))
    const [order, setOrder] = useState<any>(null)
    const [route, setRoute] = useState<IRoute>({
        origin: [0,0],
        arrived: [0,0],
        waypoints: null
    })
    const [time, setTime] = useState(null)
    const [distance, setDistance] = useState(null)

    const acceptTravel = (data: IntentOfTravel ) => {
        socket.emit("intent_of_travel", { 
            order: data.order, 
            accepted: true, 
            routes: data.routes 
        })
    }

    useEffect(() => {
        socket.on("intent_of_travel", async (data: IntentOfTravel ) => {
            console.log(data);
            setOrder(data.order)
            setRoute(data.routes)
            await notifier.notifyAsForm("Quer Aceitar Uma Nova Viajgem ?", () => {
                acceptTravel(data)
            }, () => {
                // TODO
            })
        })

        return () => {
            socket.off("intent_of_travel")
        }
    }, [])

    useEffect(() => {
        socket.on("accept_order", async () => {
            await notifier.notify("success", "Viajem Finalizada Com Sucesso!", 10000)
        })

        return () => {
            socket.off("accept_order")
        }
    }, [])
    useEffect(() => {
        if (order) {
            setLoading(`${styles['chat-column']}`)
        }
    }, [order])

    return (
        <div className={styles['main']}>
            <Navbar />
            <div className={styles['route-container']}>
                {route && (
                    <LoadScript googleMapsApiKey='AIzaSyCDdjSa4towU8PmPM69QoPItOkOz7xOXII'>
                        <Route 
                           setPreviewTime={setTime}
                           setDistance={setDistance}
                           destination={route.arrived}
                           origin={route.origin}
                           waypoints={route.waypoints}/>
                    </LoadScript>
                )}
            </div>
            <div className='flex-col'>
            <div className={`${loading}`}>
                { order ? <Chat
                    key={1}
                    _to={{
                        id: order?.deliveryman?.id as number,
                        name: order?.deliveryman?.name as string,
                        photo: order?.deliveryman?.picture_uri as string,
                    }}
                    from={user.id}
                /> : "Aguardando Corrida iniciar...."}
            </div>
            <div className="flex">
                <div className="button">Pedidos Recolhidos</div>
                <div className="button red">Finalizar Corrida</div>
            </div>
            </div>
        </div>
    )
}