import { useRouter } from 'next/router';

export default function Ranking() {
  const router = useRouter();
  return (
    <div>
      덕담: {router.query.sentence}
      <br />
    </div>
  );
}
