type Props = {
  params: { userName: string };
};

export default function UserProfilePage({ params }: Props) {
  return (
    <div>
      <h2>Profile of {params.userName}</h2>
    </div>
  );
}
