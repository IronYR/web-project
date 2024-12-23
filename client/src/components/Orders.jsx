import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function Orders(props) {
  const navigate = useNavigate();
  return (
    <div>
      <h3>Orders</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>OrderID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.orderData.map((data, idx) => (
            <TableRow key={idx}>
              <TableCell>{data.orderId}</TableCell>
              <TableCell>{data.status}</TableCell>
              <TableCell>
                {new Date(data.placedAt).toISOString().split("T")[0]}
              </TableCell>
              <TableCell>{data.totalPrice}</TableCell>
              
              <TableCell><Button 
                onClick={() => navigate('/orders/'+data.orderId)}
              >View</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}
