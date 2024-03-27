import React from 'react'

import charticon from '../../assets/static/Chart.svg'
import charticongreen from '../../assets/static/Chartgreen.svg'
import dangertriangleicon from '../../assets/static/Dangertriangle.svg'
import dangertriangleicongreen from '../../assets/static/Dangertrianglegreen.svg'
import datasetsicon from '../../assets/static/Datasets.svg'
import datasetsicongreen from '../../assets/static/Datasetsgreen.svg'
import rocketicon from '../../assets/static/Rocket.svg'
import rocketicongreen from '../../assets/static/Rocketgreen.svg'
import settingicon from '../../assets/static/Setting.svg'
import settingicongreen from '../../assets/static/Settinggreen.svg'
import usersquareicon from '../../assets/static/user-square.svg'
import usersquareicongreen from '../../assets/static/user-squaregreen.svg'
import offercentericongreen from '../../assets/static/offercentergreen.svg'
import offercentericon from '../../assets/static/offercenter.svg'

export const dataset=[
    {
    'img':charticon,
    'imgsec':charticongreen,
    'name':'Dashboard',
    'menu':[],
    'code':0
     },
     {
        'img':datasetsicon,
         'imgsec':datasetsicongreen,
        'name':'Sim Inventory',
        'menu':['Operators','SIM List' ,'Sim request'],
        'code':1
            },
            {
                'img':rocketicon,
                 'imgsec':rocketicongreen,
                'name':'Order list',
                'menu':[],
                'code':2
                    },   
                    {
                        'img':usersquareicon,
                        'imgsec':usersquareicongreen,
                        'name':'Agent',
                        'menu':[],
                        'code':3
                            },    
                            {
                                'img':dangertriangleicon,
                                'imgsec':dangertriangleicongreen,
                                'name':'Users',
                                'menu':['Group List','User List','Agent List','Agent Request'],
                                'code':4
                                    },  
                                    {
                                        'img':offercentericon,
                                        'imgsec':offercentericongreen,
                                        'name':'Offer Center',
                                        'menu':[],
                                        'code':6
                                            }, 
                                    {
                                        'img':settingicon,
                                        'imgsec':settingicongreen,
                                        'name':'Settings',
                                        'menu':[],
                                        'code':5
                                            },  


]



