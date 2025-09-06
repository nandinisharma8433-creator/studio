import { getHistory } from '@/lib/actions';
import MainPage from '@/components/main-page';

export default async function Home() {
  // The initial history can be an empty array if Firestore is not reachable.
  const initialHistory = await getHistory();

  return <MainPage initialHistory={initialHistory} />;
}
