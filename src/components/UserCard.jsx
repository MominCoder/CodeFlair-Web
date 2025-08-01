const UserCard = ({ user }) => {
  
  const { firstName, lastName, imageURL, bio, age, gender, skills } = user;
  if (!user) return null;

  return (
    <div className="card bg-base-200 items-stretch shadow-sm mt-7">
      <div className="card-body items-center">
        <div className="avatar">
          <figure className="mask mask-heart w-34">
            <img src={imageURL} alt={firstName} />
          </figure>
        </div>

        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        {bio && <p>{bio}</p>}
        {age && <p>Age: {age} years</p>}
        {gender && <p>{gender}</p>}
        {skills.length > 0 && (
          <ul>
            <h3>Pro at:</h3>

            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        )}

        <div className="card-actions flex-nowrap justify-center">
          <button className="btn btn-primary">Interested</button>
          <button className="btn btn-ghost">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
