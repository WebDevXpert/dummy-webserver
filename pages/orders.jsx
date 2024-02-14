import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { data } from '../data/data.js';

const orders = () => {
  return (
    <div className='bg-gray-100 min-h-screen dark:bg-dark dark:text-white'>
      <div className='p-4'>
        <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto dark:bg-dark dark:text-white'>
          <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer dark:bg-dark dark:text-white'>
            <span>Order</span>
            <span className='sm:text-left text-right dark:bg-dark dark:text-white'>Status</span>
            <span className='hidden md:grid dark:bg-dark dark:text-white'>Last Order</span>
            <span className='hidden sm:grid dark:bg-dark dark:text-white'>Method</span>
          </div>
          <ul>
            {data.map((order, id) => (
              <li
                key={id}
                className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer dark:bg-light-gray dark:text-white'
              >
                <div className='flex dark:bg-light-gray dark:text-white'>
                  <div className='bg-purple-100 p-3 rounded-lg dark:bg-light-gray dark:text-white'>
                    <FaShoppingBag className='text-purple-800 dark:bg-light-gray dark:text-white' />
                  </div>
                  <div className='pl-4'>
                    <p className='text-gray-800 font-bold dark:bg-light-gray dark:text-white'>
                      ${order.total.toLocaleString()}
                    </p>
                    <p className='text-gray-800 text-sm dark:bg-light-gray dark:text-white'>{order.name.first}</p>
                  </div>
                </div>
                <p className='text-gray-600 sm:text-left text-right dark:bg-light-gray dark:text-white'>
                  <span
                    className={
                      order.status == 'Processing'
                        ? 'bg-green-200 p-2 rounded-lg dark:bg-Processing dark:text-white'
                        : order.status == 'Completed'
                          ? 'bg-blue-200 p-2 rounded-lg dark:bg-Completed dark:text-white'
                          : 'bg-yellow-200 p-2 rounded-lg dark:bg-Hold dark:text-white'
                    }
                  >
                    {order.status}
                  </span>
                </p>
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

export default orders;
