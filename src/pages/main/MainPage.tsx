import { useQuery } from '@tanstack/react-query'
import { useInitData } from "@vkruglikov/react-telegram-web-app"
import { useEffect, useState } from 'react'
import GameControls from "../../components/main/GameControls"
import JackpotCard from "../../components/main/JackpotCard"
import WinDisplay from "../../components/main/WinDisplay"

function MainPage() {
  const [initDataUnsafe] = useInitData();
  const user = initDataUnsafe!.user!;

  const [balances, setBalances] = useState({
    taxi: 0,
    virus: 0,
    dice: 0
  });

  const [jackpot] = useState({
    current: 233,
    required: 41000
  });

  const { data } = useQuery({
    queryKey: ["user/balance"],
    queryFn: async () => {
      const response = await fetch("https://bot.bazoom.ru/api/dice/balance?user_id=249835432", {
        headers: {
          "Authorization": "Bearer fgnokuwerDFBjcbvlijrt98Q5iwhebjasCjknfd0b293hgthvJDdlfoJ0918brklhho"
        }
      });
      const data = await response.json()
      return data;
    },
  })

  useEffect(() => {
    setBalances(data);
  }, [data])

  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      {/* Баннер джекпота */}

      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Карточки баланса и джекпота */}
        <div className="grid grid-cols-2 gap-4">
          {/* <BalanceStatus
            taxiBalance={balances.taxi}
            virusBalance={balances.virus}
            diceBalance={balances.dice}
          /> */}
          {JSON.stringify(balances)}
          <JackpotCard
            won={jackpot.current}
            required={jackpot.required}
          />
        </div>

        {/* Выигрыш */}
        <WinDisplay
          type="win"
          wins={[
            { amount: 233, token: { symbol: '$DICE', icon: <img src="/assets/dice-icon.png" className="h-5 w-5" /> } },
          ]}
        />

        {/* Игровые контролы */}
        {
          user.id ? (
            <GameControls userId={user!.id} />
          ) : (
            null
          )
        }
      </div>
    </div>
  );
}

export default MainPage;
