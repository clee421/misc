package main

import (
	"bufio"
	"errors"
	"fmt"

	"log"
	"os"
	"strconv"
)

// BoxedGroup holds the boxed group grid and map of points already marked
type BoxedGroup struct {
	grid []string
	// marked is for all positions already checked when building bounding box
	marked map[string]bool
}

type position struct {
	x int
	y int
}

func replaceAtIndex(in string, r rune, i int) string {
	out := []rune(in)
	out[i] = r
	return string(out)
}

func main() {
	inputStream, err := getDataInputStream()
	if err != nil {
		log.Fatalln(err)
	}

	grid := getBoxGroupsFromFile(inputStream)
	marked := make(map[string]bool)

	boxGroups := BoxedGroup{
		grid:   grid,
		marked: marked,
	}

	var minBoxList [][]position
	for lineIndex := 0; lineIndex < len(boxGroups.grid); lineIndex++ {
		line := boxGroups.getLine(lineIndex)
		for charIndex := 0; charIndex < len(line); charIndex++ {
			if line[charIndex] == '*' {
				x, y, ok := boxGroups.getBoundingBox(lineIndex, charIndex)

				if ok {

					minBoxList = append(minBoxList, []position{x, y})
				}
			}
		}

	}

	nonOverlapBoxList := removeOverlaps(minBoxList)

	// for _, box := range minBoxList {
	// 	tl, br := box[0], box[1]
	// 	fmt.Printf("(%v, %v) (%v, %v)\n", tl.x+1, tl.y+1, br.x+1, br.y+1)
	// }

	for _, box := range nonOverlapBoxList {
		tl, br := box[0], box[1]
		fmt.Printf("(%v, %v) (%v, %v)\n", tl.x+1, tl.y+1, br.x+1, br.y+1)
	}
}

func (boxedGroup BoxedGroup) render() {
	fmt.Println("=================")
	for _, line := range boxedGroup.grid {
		fmt.Println(line)
	}
	fmt.Println("=================")
}

func (boxedGroup BoxedGroup) getLine(lineIndex int) string {
	return boxedGroup.grid[lineIndex]
}

func (boxedGroup BoxedGroup) getBottomRight() int {
	l := len(boxedGroup.grid)
	lastLine := boxedGroup.grid[l-1]

	return len(lastLine) - 1
}

func (boxedGroup BoxedGroup) isValidPosition(lineIndex int, charIndex int) bool {
	lenOfLine := len(boxedGroup.grid[0])
	return lineIndex >= 0 && lineIndex < len(boxedGroup.grid) && charIndex >= 0 && charIndex < lenOfLine
}

func (boxedGroup BoxedGroup) isMarked(lineIndex int, charIndex int) bool {
	key := strconv.Itoa(lineIndex) + "-" + strconv.Itoa(charIndex)
	_, ok := boxedGroup.marked[key]

	return ok
}

func (boxedGroup BoxedGroup) isValidMarked(lineIndex int, charIndex int) bool {
	validPosition := boxedGroup.isValidPosition(lineIndex, charIndex)
	notMarked := !boxedGroup.isMarked(lineIndex, charIndex)
	var isMark bool
	if validPosition && notMarked {
		// fmt.Printf("isMarkLetter: %v\n", string(boxedGroup.grid[lineIndex][charIndex]))
		isMark = boxedGroup.grid[lineIndex][charIndex] == '*'
	}
	// fmt.Println("isValidMarked")
	// fmt.Println(lineIndex, charIndex)
	// fmt.Printf("validPosition: %v\n", validPosition)
	// fmt.Printf("notMarked: %v\n", notMarked)
	// fmt.Printf("isMark: %v\n", isMark)
	return validPosition && notMarked && isMark
}

func (boxedGroup BoxedGroup) setMarked(lineIndex int, charIndex int) {
	// boxedGroup.grid[lineIndex] = replaceAtIndex(boxedGroup.grid[lineIndex], 'X', charIndex)

	key := strconv.Itoa(lineIndex) + "-" + strconv.Itoa(charIndex)
	boxedGroup.marked[key] = true
}

func removeOverlaps(boxList [][]position) [][]position {
	nonOverlapBoxList := [][]position{}

	for i := 0; i < len(boxList); i++ {
		overlap := false
		for j := 0; j < len(boxList); j++ {
			if i != j {
				if isOverlap(boxList[i], boxList[j]) {
					// fmt.Println("do i ever overlap?")
					overlap = true
					break
				}
			}
		}

		if !overlap {
			nonOverlapBoxList = append(nonOverlapBoxList, boxList[i])
		}
	}

	return nonOverlapBoxList
}

func isOverlap(posA []position, posB []position) bool {
	// fmt.Printf("checking overlap of: (%v, %v) (%v, %v) & (%v, %v) (%v, %v)\n", posA[0].x+1, posA[0].y+1, posA[1].x+1, posA[1].y+1, posB[0].x+1, posB[0].y+1, posB[1].x+1, posB[1].y+1)
	topLeft := posA[0]
	bottomRight := posA[1]
	bottomLeft := position{topLeft.x, bottomRight.y}
	topRight := position{bottomRight.x, topLeft.y}
	tl := isWithin(topLeft, posB)
	br := isWithin(bottomRight, posB)
	bl := isWithin(bottomLeft, posB)
	tr := isWithin(topRight, posB)
	// fmt.Printf("Top Left: (%v, %v); res: %v\n", topLeft.x+1, topLeft.y+1, tl)
	// fmt.Printf("Top Right: (%v, %v); res: %v\n", topRight.x+1, topRight.y+1, tr)
	// fmt.Printf("Bottom Right: (%v, %v); res: %v\n", bottomRight.x+1, bottomRight.y+1, br)
	// fmt.Printf("Bottom Left: (%v, %v); res: %v\n", bottomLeft.x+1, bottomLeft.y+1, bl)

	return tl || br || bl || tr
}

func isWithin(pos position, bounds []position) bool {
	topLeft := bounds[0]
	bottomRight := bounds[1]
	left, top, right, bottom := topLeft.x, topLeft.y, bottomRight.x, bottomRight.y
	return pos.x >= left && pos.x <= right && pos.y >= top && pos.y <= bottom
}

func (boxedGroup BoxedGroup) getBoundingBox(lineIndex int, charIndex int) (position, position, bool) {
	if boxedGroup.isMarked(lineIndex, charIndex) {
		return position{}, position{}, false
	}

	directions := [][]int{
		{-1, 0},
		{0, 1},
		{1, 0},
		{0, -1},
	}

	topLeft := position{boxedGroup.getBottomRight(), boxedGroup.getBottomRight()}
	bottomRight := position{0, 0}

	// BFS to find all continuous *
	queue := []position{
		{lineIndex, charIndex},
	}

	for len(queue) > 0 {
		next := queue[0]
		queue = queue[1:]
		// fmt.Println(next)

		boxedGroup.setMarked(next.x, next.y)
		// boxedGroup.render()
		if next.x < topLeft.x {
			topLeft.x = next.x
		}

		if next.y < topLeft.y {
			topLeft.y = next.y
		}

		if next.x > bottomRight.x {
			bottomRight.x = next.x
		}

		if next.y > bottomRight.y {
			bottomRight.y = next.y
		}

		for _, d := range directions {
			// fmt.Println("each direction")
			// fmt.Println(d)
			// fmt.Println(queue)
			x, y := next.x+d[0], next.y+d[1]
			result := boxedGroup.isValidMarked(x, y)
			// fmt.Printf("check: %v, %v; result: %v\n", x, y, result)
			if result {
				// fmt.Println("anyting valid?")
				queue = append(queue, position{x, y})
			}
		}
	}

	// fmt.Println("marked")
	// fmt.Println(boxedGroup.marked)

	return topLeft, bottomRight, true
}

func getDataInputStream() (*os.File, error) {
	fi, _ := os.Stdin.Stat()

	if (fi.Mode() & os.ModeCharDevice) == 0 {
		return os.Stdin, nil
	}

	return nil, errors.New("Correct usage: \"cat groups.txt | go run main.go\"")
}

func getBoxGroupsFromFile(input *os.File) []string {
	var boxGroups []string

	scanner := bufio.NewScanner(input)
	for scanner.Scan() {
		p := scanner.Text()

		boxGroups = append(boxGroups, p)
	}

	return boxGroups
}
