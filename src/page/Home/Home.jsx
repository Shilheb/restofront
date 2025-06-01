import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/Appdownload'
import SearchBar from '../../components/SearchBar/SearchBar'
import SectionDivider from '../../components/SectionDivider/SectionDivider'

const Home = () => {
  const [category, setCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  return (
    <div className="home-container">
      <Header/>
      <SearchBar onSearch={handleSearch} />
      <SectionDivider variant="subtle" />
      <ExploreMenu setCategory={setCategory} category={category}/>
      <SectionDivider />
      <FoodDisplay category={category} searchTerm={searchTerm}/>
      <SectionDivider variant="subtle" />
      <AppDownload/>
    </div>
  )
}

export default Home