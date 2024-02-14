import React from 'react';
import { BsPersonFill, BsThreeDotsVertical } from 'react-icons/bs';
import { data } from '../data/data.js';

const customers = () => {
  return (
    <div className='bg-gray-100 min-h-screen dark:bg-dark dark:text-white'>
      <div className='p-4 dark:bg-dark dark:text-white'>
        <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto dark:bg-dark dark:text-white'>
          <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer dark:bg-dark dark:text-white'>
            <span className=' dark:bg-dark dark:text-white'>Name</span>
            <span className='sm:text-left text-right dark:bg-dark dark:text-white'>Email</span>
            <span className='hidden md:grid dark:bg-dark dark:text-white'>Last Order</span>
            <span className='hidden sm:grid dark:bg-dark dark:text-white'>Method</span>
          </div>
          <ul>
            {data.map((order, id) => (
              <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer dark:bg-light-gray dark:text-white'>
                <div className='flex items-center dark:bg-light-gray dark:text-white'>
                  <div className='bg-purple-100 p-3 rounded-lg dark:bg-light-gray dark:text-white'>
                    <BsPersonFill className='text-purple-800 dark:bg-light-gray dark:text-white' />
                  </div>
                  <p className='pl-4'>{order.name.first + ' ' + order.name.last}</p>
                </div>
                <p className='text-gray-600 sm:text-left text-right dark:bg-light-gray dark:text-white'>{order.name.first}@gmail.com</p>
                <p className='hidden md:flex dark:bg-light-gray dark:text-white'>{order.date}</p>
                <div className='sm:flex hidden justify-between items-center dark:bg-light-gray dark:text-white'>
                  <p>{order.method}</p>
                  <BsThreeDotsVertical />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default customers;
