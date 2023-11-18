# whendidiapp

A React Native app for tracking chores by simply storing the last date on which you did them.

Ideal for people who want a lower pressure to-do application for regular chores that should be completed daily or less frequently (vacuuming, washing sheets, changing air filter, etc)

Adding a task uses a Modal where you set the task title, and how many days ago you last completed it.

Then it is added to the list and will update as time passes to tell you how many days have passed since last completed.

Once you do the task again, in your app just long-press that task to update it to 0 days ago.

Currently the only way to delete tasks is to clear the whole list, individual task deletion/editing on the way.

App utilizes AsyncStorage to store data locally on the device.
