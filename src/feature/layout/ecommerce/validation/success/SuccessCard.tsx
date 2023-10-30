"use client";
import React from 'react'
import { getOrderInfo } from '../../utils.server'

export const SuccessCard = async ({ orderId }: { orderId: string }) => {
    const test = await getOrderInfo("")
  return (
      <div>{test?.orderRef}</div>
  )
}
