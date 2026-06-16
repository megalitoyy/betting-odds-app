'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [odds, setOdds] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSport, setSelectedSport] = useState('soccer_epl')

  useEffect(() => {
    fetchOdds()
  }, [selectedSport])

  const fetchOdds = async () => {
    setLoading(true)
    try {
      const apiKey = 'YOUR_API_KEY_HERE'
      const response = await fetch(
        `https://api.the-odds-api.com/v4/sports/${selectedSport}/odds/?apiKey=${apiKey}&regions=us,uk,eu&markets=h2h&oddsFormat=decimal`
      )
      const data = await response.json()
      setOdds(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const sports = [
    { key: 'soccer_epl', name: '⚽ English Premier League' },
    { key: 'basketball_nba', name: '🏀 NBA' },
    { key: 'americanfootball_nfl', name: '🏈 NFL' },
  ]

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            MegaWin
          </span>
        </h1>
        
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-4 mb-6 text-center">
          <p className="text-white font-bold text-lg">🎁 Welcome Bonus!</p>
          <p className="text-white">Get 50 KES FREE when you sign up!</p>
        </div>

        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          className="w-full md:w-auto px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg mb-6"
        >
          {sports.map(sport => (
            <option key={sport.key} value={sport.key}>{sport.name}</option>
          ))}
        </select>

        {loading ? (
          <div className="text-center py-12">Loading odds...</div>
        ) : (
          <div className="space-y-4">
            {odds.map((game: any) => (
              <div key={game.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h3 className="font-bold">
                  {game.home_team} vs {game.away_team}
                </h3>
                <p className="text-sm text-gray-400">
                  {new Date(game.commence_time).toLocaleString()}
                </p>
                <button className="mt-3 bg-yellow-500 text-black px-4 py-1 rounded text-sm font-bold">
                  Bet Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
      }
