import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar' // use the shadcn/ui version
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '../ui/popover' // ensure this is shadcn/ui popover
import { Edit2, MoreHorizontal } from 'lucide-react'

const CompaniesTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Avatar>
                <AvatarImage src="https://www.shutterstock.com/image-vector/profile-icon-symbol-black-outline-user-2567236545" />
              </Avatar>
            </TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>18-07-2024</TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="p-1 rounded bg-gray-100">
                    <MoreHorizontal />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-32 bg-white shadow-md p-2 rounded-md">
                  <div className="flex items-center gap-2 w-full cursor-pointer bg-blue-100 hover:bg-blue-200 p-2 rounded">
                    <Edit2 className="w-4 text-blue-700" />
                    <span className="text-blue-700 text-sm">Edit</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable
