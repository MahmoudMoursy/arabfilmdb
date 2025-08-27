// Test file for work editing functionality
// Run this in browser console to test the edit functionality

const testEditWork = async () => {
  try {
    // First, get a work to edit
    const response = await fetch('https://arabfilmsserver.onrender.com/api/works', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch works: ${response.status}`);
    }
    
    const works = await response.json();
    console.log('Available works:', works);
    
    if (works.length === 0) {
      console.log('No works available for testing');
      return;
    }
    
    const workToEdit = works[0];
    console.log('Work to edit:', workToEdit);
    
    // Test updating the work
    const updateData = {
      type: workToEdit.type,
      nameArabic: workToEdit.nameArabic + ' (محدث)',
      nameEnglish: workToEdit.nameEnglish + ' (Updated)',
      year: workToEdit.year,
      director: workToEdit.director,
      assistantDirector: workToEdit.assistantDirector,
      genre: workToEdit.genre,
      cast: workToEdit.cast,
      country: workToEdit.country,
      filmingLocation: workToEdit.filmingLocation,
      summary: workToEdit.summary,
      posterUrl: workToEdit.posterUrl
    };
    
    // Add series fields if it's a series
    if (workToEdit.type === 'series') {
      updateData.seasonsCount = workToEdit.seasonsCount;
      updateData.episodesCount = workToEdit.episodesCount;
    }
    
    console.log('Update data:', updateData);
    
    const updateResponse = await fetch(`https://arabfilmsserver.onrender.com/api/works/${workToEdit._id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
    
    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      throw new Error(`Failed to update work: ${updateResponse.status} - ${JSON.stringify(errorData)}`);
    }
    
    const updatedWork = await updateResponse.json();
    console.log('Successfully updated work:', updatedWork);
    
  } catch (error) {
    console.error('Test failed:', error);
  }
};

// Run the test
testEditWork();
