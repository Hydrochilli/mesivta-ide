# Introducing Git

## Learning Objectives

- know why version control is useful in software development
- understand that git is version control software
- know how to initialise a git repository and maintain a commit history
- understand the uses of remote repositories for allowing multiple users to collaborate
- know how to use a remote repository to

## Managing complexity

Sets of instructions can become extremely complex and difficult to manage over time.
We need software that will allow us to control the version of the programs that we are creating so we can move between different versions. If we're not able to move between different versions and something goes wrong then it may be impossible for us to retrieve a state of our project when everything was fully working.

### Building timelines

Consider a timeline consisting of distinct points in time - each distinct part of the timeline represents the contents of your files and folders at a specific part of time. We can update the timeline and continue to add new points in the timeline to reflect changes or updates we've made to our file content. The essential components of such a time line could be specified as follows:

### Basic timeline requirements

1. Store content of file and directories
2. Add new `"points"` to the timeline
3. View the changes we've made since the last point in our time line
4. Move between between the points in the timeline (akin to time travel)

> git is **version control software** and some of its most basic features will allow us to fulfill all the requirements of a basic content timeline.

## git command line interface

Git has a rich command line interface - in other words a catalogue of commands that we can use for using git's features. One of the starting commands is `git init`.

`git init` a creates a new git repository - this will be the place where git stores the content of files and folders in each snapshot on your timeline.

```terminal
$ git init
Initialized empty Git repository in /Users/mitch/Documents/Scores/.git/
```

If we run the command `ls -a` we can print all the files and directories including those directories that start with a `.`

```terminal
$ ls -a
. .. .git
```

### Storing content

We can store content on our project timeline by creating distinct snapshots that show us the content of our files and directories at a given moment in time.

### Working directory

The working directory refers to all the files and directories that we have immediate access to in our project. Typically the working directory will be all the files and directories you can inspect in your code editor.

### `git init`

Suppose I start a project with an empty directory (a directory containing no sub-directories or files) and then I run `git init` - This will create a new **empty git repository**. An empty git repository is one that does not yet store content from our files and folders. Suppose we create a new directory `new_project` that will contain all the data for a project:

```terminal
$ mkdir new_project

$ cd new_project

$ ls

$ git init
Initialized empty Git repository in /Users/mitch/Documents/Scores/.git/

$ ls -a
. .. .git
```

Suppose a new file `list.txt` is created with some file content, as follows:

```raw
---- list.txt ----
My new list of ingredients

```

This new file is not currently stored in the git repository `.git`. Instead we have updated the **working directory**.

> The **working directory** refers to all of the files and directories we can currently view and edit in our project.

### `git status`

`git` will register that the **working directory** has been updated and we can view this information by running the `git status` command:

```terminal
$ git status
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        list.txt

nothing added to commit but untracked files present (use "git add" to track)
```

The most important part of this command is the section beginning `Untracked files`.
An **untracked file** is a newly created file that has not yet been stored inside the git repository. In order to store this content on our timeline we need to use additional `git` commands.

### `git add`

Git uses 3 different areas to manage the state of our content. In order to create a new commit (a snapshot) and have git store it permanently we must first add changes in our working tree to the **staging area**. The **staging area** is an area inside git where we store all the changes that we want stored in our next snapshot. We can use the `git add` command in order to stage these changes.

- Working directory: `list.txt`

- Staging area:

- Git repository:

We can run the `git add` command as follows:

```terminal
$ git add list.txt
```

This will stage the file `list.txt` and we can check that this has worked by running the command `git status` again:

```terminal
$ git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

  new file:   list.txt
```

### `git commit`

It is our goal ultimately to store a snapshot of our file and directories so we can start to create a timeline consisting of snapshots of our project. Once we have a some changes saved and staged in the git staging area we can then create a **git commit**.
We can use the command `git commit -m <commit-message-here>`. The commit message should be a brief message summarising the changes that are being stored in this particular commit.

```terminal
$ git commit -m "Add list.txt"
[main (root-commit) 1d3a896] Add list.txt
 1 file changed, 1 insertion(+)
 create mode 100644 list.txt
```

Note that the output for this command is also saying that this commit is regarded as the **root commit** as it is the first commit stored inside the git repository.

### `git log`

We can use the command `git log` to list all the commits stored inside a git repository. You can also think of `git log` as printing the timeline of different commits in our project.

```terminal
$ git log
commit 1d3a89619080b20d0a5a941c470b115a78b6e8e1 (HEAD -> main)
Author: Mitch Lloyd <mitch@northcoders.com>
Date:   Mon Apr 27 15:29:57 2020 +0100

    Add list.txt
```

## Branches

A commit is a snapshot of the files and folders in our project over time. Over time we can create multiple commits to build up a timeline containing different snapshots. Each commit that we create will automatically point back to the previous parent commit (unless it is the root commit). The commits we create therefore create a chain or sequence. It is therefore sufficient to point to a single commit as these will continue to point back to form a chain. A **branch** in git is often referred to as a series of commits that forms a timeline representing some work in a project. However, we need only point a single commit as this one points back the others.

> A **branch** is a reference to a particular commit.

The branch that is created by default when a new empty git repository is created is the **main** branch. Whenever a new git commit is created then **main** branch is updated so it points to the most recent commit.

Reasons for using multiple branches will be covered at a later date.

## Github

Version control software allows one to manage and update the versions of a project over time. However, git is regarded more fully as **distributed version control software**. The term **distributed** means that any number of users (with the relevant permissions) can access the git repository and therefore gain access to the entire history of the project.
Github is a website that stores github repositories in the cloud and allows multiple users to store their work so that each collaborator can share their changes online.

Github repositories can also be created newly on the github website.

### Remotes

A remote repository is one stored on github that others can access and update from local machines. A typical pattern is to have one remote repository and other uses can create clones of this repository on to their local machine. Users can create local changes to the git repository on their machine and then once ready add their changes the remote repository. The name origin is a convention way of referring to a git remote repository - a new github repository will be referred to as origin.

### Creating a link

When a new repository is created on github then a new url is generated which points to the remote repository on github. We can use this url to connect a local machine with a github repo so work can be retrieved from the remote and so the remote can be updated with any local commits. We can use the command `git remote`:

```terminal
$ git remote add origin <origin-repository-url>
```

Once this command has been executed this can be checked by running `git remote -v`:

```terminal
$ git remote -v
origin  https://github.com/northcoders/remote_precourse_js.git (fetch)
origin  https://github.com/northcoders/remote_precourse_js.git (push)
```

### `git push`

We can use the command `git push` in order to add any of the commits on our local machine on to a remote repository. If main branch is 3 commits ahead of our the origin repository's main branch then using `git push` will add the three local commits on to the `main` branch of the origin repository. We can use the `git push` command in the following way:

```terminal
$ git push origin main
Enumerating objects: 65, done.
Counting objects: 100% (63/63), done.
Delta compression using up to 4 threads
Compressing objects: 100% (41/41), done.
Writing objects: 100% (48/48), 61.79 KiB | 6.87 MiB/s, done.
Total 48 (delta 10), reused 0 (delta 0)
remote: Resolving deltas: 100% (10/10), completed with 5 local objects.
To https://github.com/northcoders/remote_precourse_js.git
   9e0de15..6648df7  main -> main
```

The intricacies of the command output aren't worth exploring at this stage but its important to note we'll get output like this if the `git push` command was successful. Once this command is executed both the local `main` branch and the `origin` `main` branch abbreviated as `origin/main` will be pointing at the same commit. In this commit, both the local and the remote main branches are up to-date.

### `git pull`

We can use the command `git pull` in a similar way to `git push`, in order to update our local machine with add any of the more recent commits from a remote repository.
