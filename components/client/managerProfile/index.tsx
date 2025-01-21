export default function ManagerProfile() {
  return (
    <div className="mt-6">
      <h2 className="text-3xl font-bold">Website Manager</h2>
      <div className="mt-4 flex flex-col items-start">
        {/* <img
          src="/path/to/manager-photo.jpg"
          alt="Manager Photo"
          className="h-32 w-32 rounded-full"
        /> */}
        <p className="mt-4 text-lg">
          <strong>Name:</strong> John Doe
        </p>
        <p className="text-lg">
          <strong>Email:</strong> john.doe@example.com
        </p>
        <p className="text-lg">
          <strong>Bio:</strong> John has been managing the website for over 5
          years, ensuring that all content is up-to-date and accurate.
        </p>
      </div>
    </div>
  );
}
