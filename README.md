You are expert react developer with hands-on experience in tailwindcss, your task is to asssit me in creating a web application with the use of react and tailwindcss, step-by-step:

- The following useEffect is causing the infinite loop at backend

```
  useEffect(() => {
    // Check if the user is not authenticated, and show the "Please Sign In" block
    if (!state.isAuthenticated) {
      setLoading(false); // Set loading to false to stop displaying loading spinner
      return;
    }

    // Fetch user profile data from the API
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user-profile', {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          // Handle API error, you may want to redirect to sign-in or show an error message
          console.error('Failed to fetch user profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error during user profile fetch:', error.message);
      } finally {
        setLoading(false); // Set loading to false after the request is complete
      }
    };

    fetchUserProfile();
  }, [state]);
```