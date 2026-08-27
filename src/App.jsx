import { useState } from 'react'

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`https://nexus-ai-api-app5.onrender.com/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      setResults(data.top_matches)
    } catch (error) {
      console.error("Error connecting to backend:", error)
      alert("Make sure your Python server is running!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '60px 20px', maxWidth: '850px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ color: '#f8fafc', fontSize: '3rem', marginBottom: '10px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          Nexus <span style={{ color: '#38bdf8' }}>AI</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Semantic Game Discovery Engine</p>
      </div>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '15px', marginBottom: '50px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by mechanics, lore, or vibe (e.g., survival horror in a rural village)..."
          style={{ 
            flex: 1, 
            padding: '18px 25px', 
            fontSize: '16px', 
            borderRadius: '12px', 
            border: '1px solid #334155',
            backgroundColor: '#1e293b',
            color: 'white',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
        />
        <button 
          type="submit" 
          disabled={loading} 
          style={{ 
            padding: '0 35px', 
            fontSize: '16px', 
            cursor: 'pointer', 
            backgroundColor: '#38bdf8', 
            color: '#0f172a', 
            border: 'none', 
            borderRadius: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)'
          }}>
          {loading ? 'Scanning...' : 'Search'}
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {results.map((result, index) => (
          <div key={index} style={{ 
            border: '1px solid #334155', 
            padding: '25px', 
            borderRadius: '16px', 
            backgroundColor: 'rgba(30, 41, 59, 0.7)', 
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '1.6rem' }}>{result.title}</h2>
              <span style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid #38bdf8', padding: '6px 14px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                Match: {(result.similarity_score * 100).toFixed(1)}%
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span style={{ backgroundColor: '#0f172a', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', color: '#94a3b8', border: '1px solid #334155' }}>
                📅 {result.year}
              </span>
              <span style={{ backgroundColor: '#0f172a', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', color: '#94a3b8', border: '1px solid #334155' }}>
                🎮 {result.genre}
              </span>
              <span style={{ backgroundColor: 'rgba(250, 204, 21, 0.1)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', color: '#facc15', border: '1px solid rgba(250, 204, 21, 0.3)', fontWeight: 'bold' }}>
                ⭐ {result.rating}/10
              </span>
            </div>

            <p style={{ margin: 0, color: '#cbd5e1', lineHeight: '1.7', fontSize: '1.05rem' }}>{result.description}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default App