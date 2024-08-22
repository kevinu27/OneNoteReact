import React, {useContext, useEffect } from 'react';
import { TabsContext } from '../context/Tabs-context.jsx'
import './Tabs.css'



export default function Tabs() {

    const { activeTab, handleTabSelection , tabs, handleTabsLoad } = useContext(TabsContext)
    
    useEffect(() => {
        console.log('tabs en el useffect', tabs)
        // if(tabs.length < 1){
        //     console.log('no tabs')

            handleTabsLoad({name: 'useffectLoadedTab', index: 0, color:'#fff'})
        // }
      }, []);

    console.log('activeTab', activeTab) 

    function onTabClickHandler(tab, index) {
        console.log('onclick de la tab')
        console.log('onclick de la tab tab', tab)
        console.log('onclick de la index', index)

        handleTabSelection(tab, index);
    }

    return(
        <>
            {/* <p>
                tabs Componente:
                {activeTab.name}
            </p> */}
            {activeTab.name}
            <div className='tabs-row'>  { tabs.length > 0 ? tabs.map( (tab, index) => <p className={`tab ${activeTab.name == tab.name ? 'active-tab' : ''}`} onClick={()=> onTabClickHandler(tab, index )} key={index}>tabs.name {tab.name} - </p> )  : null} </div>
         
          
         
        </>
    )
}