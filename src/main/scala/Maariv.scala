import scala.io.Source
import scalatags.Text.TypedTag
import scalatags.Text.all._

/**
  * Created by Joseph K. Strauss on 4/7/2017.
  */
object Maariv {

  implicit val codec = scala.io.Codec.UTF8

  lazy val blessingLines = Source.fromFile("src/main/resources/passover/maariv.txt").getLines.toArray

  def render(stanzas:  List[TypedTag[String]]):  List[TypedTag[String]] = stanzas.zipWithIndex.map {
    case (stanza, index) => p(div(
      blessingLines(index * 2),
      stanza,
      blessingLines((index * 2 )+ 1)
    ))
  }
}
