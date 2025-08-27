const UserDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Halo, {user.name}!</h1>
      <p>Anda login sebagai user biasa.</p>
    </div>
  );
};

export default UserDashboardPage;