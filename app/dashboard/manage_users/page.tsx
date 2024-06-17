
import { UserCards } from '@/app/ui/dashboard/manage_users/user-card';
import { fetchUsers, fetchUsersByQuery, isAdmin } from '@/lib/data'
import { User } from '@/src/generated/cliet';
import Search from '@/app/ui/search';
import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

async function Page( {
  searchParams,
  }: {
      searchParams?: {
      query?: string;
      page?: string;
      };
  }
) {

  const query = searchParams?.query || '';
  const users : User[] = await fetchUsersByQuery(query);
  const user = await currentUser();

  // For super user : CHARLES THE GREAT
  const isSuperUser = user?.id == process.env.SUDO_USER_ID;
  let filteredUsers = users;


  const isUserAdmin = await isAdmin();
  if (isSuperUser){
    filteredUsers = users.filter((fetchedUser) => user?.id != fetchedUser.id);
  }
  else {
    filteredUsers = users.filter((fetchedUser) => process.env.SUDO_USER_ID != fetchedUser.id);
  }


  if (!isUserAdmin) {
    notFound();
  }

  return (
    <div className='overflow-auto no-scrollbar'>
      <p className='text-lg font-bold mb-4'>Manage Users</p>
      <hr/>
      <Search placeholder='Search user...'/>
      <UserCards users={filteredUsers}/>
    </div> 
  )
}

export default Page