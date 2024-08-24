import React, {useContext, useEffect, useState } from 'react';
import { TabsContext } from '../context/Tabs-context.jsx'
import './Tabs.css'



export default function Tabs() {

    const { activeTab, handleTabSelection , tabs, handleTabsLoad, handleTabNameChange } = useContext(TabsContext)
    const [, updateState] = useState();
    useEffect(() => {
        // console.log('tabs en el useffect', tabs)
        // if(tabs.length < 1){
        //     console.log('no tabs')let variable = otraVariable ?? valorPorDefecto

        let storedLines = JSON.parse(localStorage.getItem('tabs'));
        console.log('............tabs-------!!!!!!!!!!!!!!!!', tabs)

        // let storedTextBoxes = JSON.parse(localStorage.getItem('textBoxes'));
        console.log('tabs en el useffect-------------------------------------------------------')

            handleTabsLoad(storedLines)
            // updateState()
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
    function onTabClicCreateNewTabkHandler() {
            console.log('add tab')
            handleTabsLoad({name: `new tab ${ tabs.length}`, index: parseInt(tabs.length), color:'#fff'})
            // tabs.push({name: `new tab ${ tabs.length}`, index: parseInt(tabs.length), color:'#fff'})
    }


    return(
        <>
            {/* <p>
                tabs Componente:
                {activeTab.name}
            </p> */}
            {/* {activeTab.name} */}

        <div className='tabs-row'>

            <div className='tabs-row'>  { tabs.length > 0 ? tabs.map( (tab, index) =><> <input  key={index}  type="text" className={`tab ${activeTab.index == tab.index ? 'active-tab' : ''}`} onClick={()=> onTabClickHandler(tab, index )} onChange={(e)=> onNameChangeHandler(e, tab, index)}  value={tab.name}></input> </>)  : null} </div>
            <button onClick={()=> onTabClicCreateNewTabkHandler()}>+</button>
        </div>

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