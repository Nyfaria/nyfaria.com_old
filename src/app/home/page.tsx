import '../../app.css'
import {ClientOnly} from "./client";

export function generateStateParams(){
    return [{slug:['']}]
}

export default function Page(){
    return <ClientOnly />
}