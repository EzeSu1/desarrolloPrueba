import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const usePanel = () => {
    const [panelOpen, setPanelOpen] = useState(false)
    const [anchorElement, setAnchorElement] = useState(null)
    const navigate = useNavigate()

    const closePanel = () => {
        setAnchorElement(null)
        setPanelOpen(false)
    }

    const openPanel = (event)=> {
        setAnchorElement(event.currentTarget)
        setPanelOpen(true)
    }

    const navigateTo = (path)=> {
        closePanel()
        navigate(path)
    }

    return {openPanel, closePanel, navigateTo, panelOpen, anchorElement, setPanelOpen}
}