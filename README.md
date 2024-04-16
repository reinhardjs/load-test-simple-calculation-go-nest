## Run K6 Test
```
k6 run nest.js
```

or 

```
k6 run go.js
```

</br>

## How to run nest js

Go inside `./nest` directory, then run

```
yarn
```

```
yarn start
```

or

```
sudo docker build -t nest .
```

```
sudo docker run --detach --restart unless-stopped -p 4200:4200 nest
```

</br>


## How to run go

Go inside `./go` directory, then run

```
go mod tidy
```

```
go run main.go
```

or 

```
sudo docker build -t go .
```

`--cpus=054` to make it the same as performance result as nest.js

```
sudo docker run --detach --restart unless-stopped --cpus=0.54 -p 8080:8080 go
```

</br>

## How to run rust

Go inside `./rust` directory, then run

```
cargo r -r
```
