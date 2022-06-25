import React from 'react'

const Item=(item)=>{
    console.log(item);
    const itemtitle=item.item.itemTitle;
    const itemtext=item.item.itemText;
  return (
    <>
    <div className='itemcontainer'>
    <div className='itemtitle'>{itemtitle}</div>
    <div className='itemtext'>{itemtext}</div>
    </div>
    </>
  )
}

export default Item