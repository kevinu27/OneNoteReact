import React, {useContext, useEffect } from 'react';
import { TabsContext } from '../context/Tabs-context.jsx'
import './Tabs.css'



export default function Tabs() {

    const { activeTab, handleTabSelection , tabs, handleTabsLoad, handleTabNameChange } = useContext(TabsContext)
    
    useEffect(() => {
        // console.log('tabs en el useffect', tabs)
        // if(tabs.length < 1){
        //     console.log('no tabs')

            handleTabsLoad({name: 'useffectLoadedTab', index: 0, color:'#fff'})
        // }
      }, []);

    // console.log('activeTab*//*/*/*/*/*/*/*/*/*/*/*/*/*/', activeTab) 

    function onTabClickHandler(tab, index) {
        // console.log('onclick de la tab')
        tab.index = index
        // console.log('onclick de la tab tab!!!!!!!', tab)
        // console.log('onclick de la index', index)

        handleTabSelection(tab);
    }
    function onNameChangeHandler(e, tab, index) {
        console.log('oncange de la tab event-------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', tab)
        console.log('oncange de la tab index -----', index)
        console.log('oncange de la tab e -----', e)
        // const activeTabIndex = activeTab.index
        // const tabName =  event.target.value
        // console.log('o--------', tab)
        const updatedTab = { ...tab, name: e.target.value, index };  // create a new object with updated name
        handleTabNameChange(updatedTab);
    }


    return(
        <>
            {/* <p>
                tabs Componente:
                {activeTab.name}
            </p> */}
            {/* {activeTab.name} */}
            <div className='tabs-row'>  { tabs.length > 0 ? tabs.map( (tab, index) =><> <input type="text" className={`tab ${activeTab.name == tab.name ? 'active-tab' : ''}`} onClick={()=> onTabClickHandler(tab, index )} onChange={(e)=> onNameChangeHandler(e, tab, index)}  key={index} value={tab.name}></input>  <p>{tab.name}</p></>)  : null} </div>
        {/* <div>
           {
            tabs.map( tab => 
            <div className='prueba'>
                <p>{tab.name} - {' '}</p>
                <p>{tab.index} - {' '}</p>
                <p>{tab.color} - {' '}</p>

            </div> 
            )}
        </div> */}
          
         
        </>
    )
}