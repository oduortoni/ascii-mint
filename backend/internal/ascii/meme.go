package ascii

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Meme struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Owner       string             `bson:"owner,omitempty" json:"owner,omitempty"`
	Content     string             `bson:"content" json:"content"`
	Frame       string             `bson:"frame" json:"frame"`
	Rendered    string             `bson:"rendered" json:"rendered"`
	Sha256      string             `bson:"sha256" json:"sha256"`
	MetadataURI string             `bson:"metadata_uri,omitempty" json:"metadata_uri,omitempty"`
	Minted      bool               `bson:"minted" json:"minted"`
	Chain       string             `bson:"chain,omitempty" json:"chain,omitempty"`
	TokenID     string             `bson:"tokenId,omitempty" json:"tokenId,omitempty"`
	CreatedAt   time.Time          `bson:"createdAt" json:"createdAt"`
}

func (meme Meme) String() string {
	s := fmt.Sprintf("{\n\tContent: %s\n\tFrame: %s\n}\n\n", meme.Content, meme.Frame)
	return s
}

func ComputeSHA256(text string) string {
	h := sha256.Sum256([]byte(text))
	return hex.EncodeToString(h[:])
}

func SaveMeme(ctx context.Context, coll *mongo.Collection, m Meme) (*mongo.InsertOneResult, error) {
	m.CreatedAt = time.Now().UTC()
	return coll.InsertOne(ctx, m)
}

func GetMemeByHash(ctx context.Context, coll *mongo.Collection, hash string) (*Meme, error) {
	var mm Meme
	err := coll.FindOne(ctx, bson.M{"sha256": hash}).Decode(&mm)
	if err != nil {
		return nil, err
	}
	return &mm, nil
}
