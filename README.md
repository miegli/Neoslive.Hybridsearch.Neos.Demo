# Neoslive.Hybridsearch.Neos.Demo


First of all you need a firebase realtime database. Create new a firebase project for free: 
https://console.firebase.google.com/

Then you need a database token. Open your firebase project settings and create new database secret/token (see service accounts > Database secrets).

**Install flow package:**
`composer require neoslive/hybridsearch-neos-demo`

**Add to your flow Settings.yaml**

```
Neoslive:
  Hybridsearch:
    Firebase:
      endpoint: 'https://** your firebase project name**.firebaseio.com/'
      token: '** your firebase token **'
```

**Run flow command for initial indexing your Neos.Demo Site**

`php ./flow hybridsearch:createfullindex`

See also 
https://github.com/miegli/Neoslive.Hybridsearch