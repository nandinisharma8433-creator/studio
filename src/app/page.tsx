import { getHistory } from '@/lib/actions';
import MainPage from '@/components/main-page';

export default async function Home() {
  const initialHistory = await getHistory();

  return <MainPage initialHistory={initialHistory} />;
}
