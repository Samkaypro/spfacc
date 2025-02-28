// 'use client'

// import { useState } from 'react'
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from "@/components/ui/table"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue,
// } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { UserCircle, Mail, Phone, MapPin, Calendar, Shield, FileText } from 'lucide-react'

// type UserRole = 'ADMIN' | 'TEAM_MEMBER' | 'USER'

// type User = {
//   id: string
//   name: string
//   email: string
//   phone: string
//   nationalId: string
//   address: string
//   city: string
//   state: string
//   zipCode: string
//   gender: string
//   image: string
//   teamType: string | null
//   createdAt: string
//   role: UserRole
// }

// const users: User[] = [
//   { 
//     id: '1', 
//     name: 'John Doe', 
//     email: 'john@example.com', 
//     phone: '+1234567890',
//     nationalId: 'ID12345',
//     address: '123 Main St',
//     city: 'Anytown',
//     state: 'State',
//     zipCode: '12345',
//     gender: 'Male',
//     image: '/placeholder.svg',
//     teamType: 'Investigation',
//     createdAt: '2023-01-01',
//     role: 'ADMIN'
//   },
//   { 
//     id: '2', 
//     name: 'Jane Smith', 
//     email: 'jane@example.com', 
//     phone: '+1987654321',
//     nationalId: 'ID67890',
//     address: '456 Elm St',
//     city: 'Othertown',
//     state: 'State',
//     zipCode: '67890',
//     gender: 'Female',
//     image: '/placeholder.svg',
//     teamType: 'Support',
//     createdAt: '2023-02-15',
//     role: 'TEAM_MEMBER'
//   },
//   { 
//     id: '3', 
//     name: 'Bob Johnson', 
//     email: 'bob@example.com', 
//     phone: '+1122334455',
//     nationalId: 'ID54321',
//     address: '789 Oak St',
//     city: 'Somewhere',
//     state: 'State',
//     zipCode: '54321',
//     gender: 'Male',
//     image: '/placeholder.svg',
//     teamType: null,
//     createdAt: '2023-03-30',
//     role: 'USER'
//   },
// ]

// export function UserList() {
//   const [filteredUsers, setFilteredUsers] = useState(users)
//   const [roleFilter, setRoleFilter] = useState('all')
//   const [searchTerm, setSearchTerm] = useState('')

//   const handleSearch = (term: string) => {
//     setSearchTerm(term)
//     filterUsers(term, roleFilter)
//   }

//   const handleRoleFilter = (role: string) => {
//     setRoleFilter(role)
//     filterUsers(searchTerm, role)
//   }

//   const filterUsers = (search: string, role: string) => {
//     const filtered = users.filter(user => 
//       (search === '' || 
//        user.name.toLowerCase().includes(search.toLowerCase()) || 
//        user.email.toLowerCase().includes(search.toLowerCase())) &&
//       (role === 'all' || user.role === role)
//     )
//     setFilteredUsers(filtered)
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>User Management</CardTitle>
//         <CardDescription>View and manage system users</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="flex items-center justify-between space-x-2 pb-4">
//           <div className="flex items-center space-x-2">
//             <Input
//               placeholder="Search users..."
//               value={searchTerm}
//               onChange={(e) => handleSearch(e.target.value)}
//               className="w-[300px]"
//             />
//             <Select onValueChange={handleRoleFilter}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Filter by role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Roles</SelectItem>
//                 <SelectItem value="ADMIN">Admin</SelectItem>
//                 <SelectItem value="TEAM_MEMBER">Team Member</SelectItem>
//                 <SelectItem value="USER">User</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <Button>Add New User</Button>
//         </div>
//         <div className="rounded-md border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>User</TableHead>
//                 <TableHead>Role</TableHead>
//                 <TableHead>Team</TableHead>
//                 <TableHead>Joined</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredUsers.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell>
//                     <div className="flex items-center space-x-3">
//                       <Avatar>
//                         <AvatarImage src={user.image} alt={user.name} />
//                         <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <div className="font-medium">{user.name}</div>
//                         <div className="text-sm text-gray-500">{user.email}</div>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant={user.role === 'ADMIN' ? 'default' : user.role === 'TEAM_MEMBER' ? 'secondary' : 'outline'}>
//                       {user.role}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>{user.teamType || 'N/A'}</TableCell>
//                   <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
//                   <TableCell>
//                     <UserProfileDialog user={user} />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// function UserProfileDialog({ user }: { user: User }) {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">View Profile</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>{user.name}'s Profile</DialogTitle>
//           <DialogDescription>
//             User details and actions
//           </DialogDescription>
//         </DialogHeader>
//         <Tabs defaultValue="details">
//           <TabsList className="grid w-full grid-cols-3">
//             <TabsTrigger value="details">Details</TabsTrigger>
//             <TabsTrigger value="complaints">Complaints</TabsTrigger>
//             <TabsTrigger value="actions">Actions</TabsTrigger>
//           </TabsList>
//           <TabsContent value="details">
//             <ScrollArea className="h-[400px] w-full rounded-md border p-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <Label className="text-sm font-medium text-gray-500">Name</Label>
//                   <div className="flex items-center space-x-2">
//                     <UserCircle className="h-4 w-4 text-gray-500" />
//                     <span>{user.name}</span>
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <Label className="text-sm font-medium text-gray-500">Email</Label>
//                   <div className="flex items-center space-x-2">
//                     <Mail className="h-4 w-4 text-gray-500" />
//                     <span>{user.email}</span>
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <Label className="text-sm font-medium text-gray-500">Phone</Label>
//                   <div className="flex items-center space-x-2">
//                     <Phone className="h-4 w-4 text-gray-500" />
//                     <span>{user.phone}</span>
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <Label className="text-sm font-medium text-gray-500">National ID</Label>
//                   <div className="flex items-center space-x-2">
//                     <Shield className="h-4 w-4 text-gray-500" />
//                     <span>{user.nationalId}</span>
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <Label className="text-sm font-medium text-gray-500">Address</Label>
//                   <div className="flex items-center space-x-2">
//                     <MapPin className="h-4 w-4 text-gray-500" />
//                     <span>{`${user.address}, ${user.city}, ${user.state} ${user.zipCode}`}</span>
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <Label className="text-sm font-medium text-gray-500">Gender</Label>
//                   <div className="flex items-center space-x-2">
//                     <UserCircle className="h-4 w-4 text-gray-500" />
//                     <span>{user.gender}</span>
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <Label className="text-sm font-medium text-gray-500">Team Type</Label>
//                   <div className="flex items-center space-x-2">
//                     <Shield className="h-4 w-4 text-gray-500" />
//                     <span>{user.teamType || 'N/A'}</span>
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <Label className="text-sm font-medium text-gray-500">Joined</Label>
//                   <div className="flex items-center space-x-2">
//                     <Calendar className="h-4 w-4 text-gray-500" />
//                     <span>{new Date(user.createdAt).toLocaleDateString()}</span>
//                   </div>
//                 </div>
//               </div>
//             </ScrollArea>
//           </TabsContent>
//           <TabsContent value="complaints">
//             <ScrollArea className="h-[400px] w-full rounded-md border p-4">
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-lg font-semibold">User Complaints</h3>
//                   <Button variant="outline" size="sm">
//                     <FileText className="mr-2 h-4 w-4" />
//                     View All
//                   </Button>
//                 </div>
//                 <p className="text-sm text-gray-500">No complaints found for this user.</p>
//               </div>
//             </ScrollArea>
//           </TabsContent>
//           <TabsContent value="actions">
//             <div className="space-y-4 py-4">
//               <div className="space-y-2">
//                 <Label>Change User Role</Label>
//                 <Select defaultValue={user.role}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select new role" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="ADMIN">Admin</SelectItem>
//                     <SelectItem value="TEAM_MEMBER">Team Member</SelectItem>
//                     <SelectItem value="USER">User</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label>Assign to Team</Label>
//                 <Select defaultValue={user.teamType || 'NO_TEAM'}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select team" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="NO_TEAM">No Team</SelectItem>
//                     <SelectItem value="Investigation">Investigation</SelectItem>
//                     <SelectItem value="Support">Support</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="flex justify-between">
//                 <Button variant="outline">Reset Password</Button>
//                 <Button variant="destructive">Deactivate Account</Button>
//               </div>
//             </div>
//           </TabsContent>
//         </Tabs>
//         <DialogFooter>
//           <Button type="submit">Save changes</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserCircle, Mail, Phone, MapPin, Calendar, Shield, FileText, User } from 'lucide-react'

type UserRole = 'ADMIN' | 'TEAM_MEMBER' | 'USER'

type User = {
  id: string
  name: string
  email: string
  phone: string
  nationalId: string
  address: string
  city: string
  state: string
  zipCode: string
  gender: string
  image: string
  teamType: string | null
  createdAt: string
  role: UserRole
}

export function UserList() {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [roleFilter, setRoleFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users')
        const data = await response.json()
        setFilteredUsers(data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterUsers(term, roleFilter)
  }

  const handleRoleFilter = (role: string) => {
    setRoleFilter(role)
    filterUsers(searchTerm, role)
  }

  const filterUsers = (search: string, role: string) => {
    const filtered = filteredUsers.filter(user => 
      (search === '' || 
       user.name.toLowerCase().includes(search.toLowerCase()) || 
       user.email.toLowerCase().includes(search.toLowerCase())) &&
      (role === 'all' || user.role === role)
    )
    setFilteredUsers(filtered)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User  Management</CardTitle>
        <CardDescription>View and manage system users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between space-x-2 pb-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-[300px]"
            />
            <Select onValueChange={handleRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="TEAM_MEMBER">Team Member</SelectItem>
                <SelectItem value="USER">User </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Add New User</Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User </TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user .id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'ADMIN' ? 'default' : user.role === 'TEAM_MEMBER' ? 'secondary' : 'outline'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.teamType || 'N/A'}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <User ProfileDialog user={user} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function UserProfileDialog({ user }: { user: User }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{user.name}&apos;s Profile</DialogTitle>
          <DialogDescription>
            User details
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-500">Name</Label>
                  <div className="flex items-center space-x-2">
                    <User Circle className="size-4 text-gray-500" />
                    <span>{user.name}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-500">Email</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="size-4 text-gray-500" />
                    <span>{user.email}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-500">Phone</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="size-4 text-gray-500" />
                    <span>{user.phone}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-500">National ID</Label>
                  <div className="flex items-center space-x-2">
                    <Shield className="size-4 text-gray-500" />
                    <span>{user.nationalId}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-500">Address</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="size-4 text-gray-500" />
                    <span>{`${user.address}, ${user.city}, ${user.state} ${user.zipCode}`}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-500">Gender</Label>
                  <div className="flex items-center space-x-2">
                    <User Circle className="size-4 text-gray-500" />
                    <span>{user.gender}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-500">Team Type</Label>
                  <div className="flex items-center space-x-2">
                    <Shield className="size-4 text-gray-500" />
                    <span>{user.teamType || 'N/A'}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-500">Joined</Label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="size-4 text-gray-500" />
                    <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button type="submit">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}