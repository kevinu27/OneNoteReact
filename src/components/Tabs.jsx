import React, {useContext, useEffect } from 'react';
import { TabsContext } from '../context/Tabs-context.jsx'



export default function Tabs() {

    const { activeTab, handleTabSelection , tabs, handleTabsLoad } = useContext(TabsContext)
    
    useEffect(() => {
        if(tabs.length < 1){
            console.log('no tabs')

            handleTabsLoad({name: 'useffectLoadedTab'})
        }
      }, []);

console.log('activeTab', activeTab) 
    function onTabClickHandler(tab) {

        handleTabSelection(tab);
    }

    return(
        <>
        <p>
            tabs Componente:
             {activeTab.name}
            </p>
            <p>TABS: {}</p>
            <p onClick={() => onTabClickHandler(1)}>
                tab 1
            </p>
        </>
    )
}