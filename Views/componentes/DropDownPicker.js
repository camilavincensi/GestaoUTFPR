import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from "react";

export default function DropDown() {
    const [selectedEmpresa, setSelectedEmpresa] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: "UTFPR - Todos", value: "All" },
        { label: "UTFPR - Dois Vizinhos", value: "DV" },
        { label: "UTFPR - Francisco Beltrão", value: "FB" },
        { label: "UTFPR - Pato Branco", value: "PB" }
    ])

    return (
        <DropDownPicker setValue={setValue}
            value={value}
            items={items}
            open={selectedEmpresa}
            setOpen={setSelectedEmpresa}
            setItems={setItems}
        />
    );
}
