export let dataset  = [];


export const addnewsimlist=(d)=>{
        console.log('sadasda',d)
        dataset.push(d)
}


export const removeItem = (itemx) => {
       console.log("sssss",itemx)
        const updatedItems = dataset.filter(item => item.iccid !== itemx.iccid);
    
      
        dataset=updatedItems;
      };

export const updateItem = (updatedItem) => {
        const updatedItems = dataset.map(item => {
          if (item.iccid === updatedItem.iccid) {
            return updatedItem;
          }
          return item;
        });
        dataset = updatedItems;
      };